import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Professor from 'App/Models/Professor'
import Sala from 'App/Models/Sala'

export default class ProfessorsController {
  public async index({params}: HttpContextContract) {
    const { matricula } = params
    
    return await Professor.findOrFail(matricula)
  }

  public async store({request}: HttpContextContract) {
    const prof:Professor = await Professor.create(request.all())
    console.log(prof)

    return 'Professor Criado com sucesso'
  }

  public async update({request,params}: HttpContextContract) {
    const { matricula } = params

    const prof:Professor|null = await Professor.findOrFail(matricula)
    prof.nome = request.input('nome')
    prof.email = request.input('email')
    prof.dataDeNascimento = request.input('dataDeNascimento')

    await prof.save()
    return 'Professor Atualizado'
  }

  public async destroy({request}: HttpContextContract) {
    const prof:Professor|null = await Professor.findOrFail(request.param('matricula'))
    if(prof != null){
      prof.delete()
      return 'Professor deletado com sucesso'
    }else{
      return 'Não foi possivel Deletar o Professor Cadastrado'
    }
     
  }

  public async indexSala({params}: HttpContextContract) {
    const { matricula , numeroSala} = params

    const prof:Professor|null = await Professor.findOrFail(matricula)
    const salaEspecifica = await prof.related('salas').query().where('numeroSala',numeroSala).first();

    return salaEspecifica
  }

  public async storeSala({request,params}: HttpContextContract) {
    const { matricula } = params
        const sala:Sala = await Sala.create(request.all())
        sala.capacidadeAlunos = request.input('capacidadeAlunos')
        sala.matriculaProfessor = matricula
        sala.disponibilidade = true

        await sala.save()
        console.log(sala)

        return sala
  }

  public async updateSala({request,params}: HttpContextContract) {
    const { matricula , numeroSala} = params

    const prof:Professor|null = await Professor.findOrFail(matricula)
    const sala = await prof.related('salas').query().where('numeroSala',numeroSala).first();
    if(sala instanceof Sala){
      sala.capacidadeAlunos = request.input('capacidadeAlunos')
      sala.disponibilidade = request.input('disponibilidade', true)

      await sala.save()
      return 'Sala Atualizada'
    }else{
      return 'Não foi possivel atualizar'
    }
  }

  public async destroySala({params}: HttpContextContract) {
    const { matricula , numeroSala} = params

    const prof:Professor|null = await Professor.findOrFail(matricula)
    const sala = await prof.related('salas').query().where('numeroSala',numeroSala).first();
    if(sala instanceof Sala){
      sala.delete()
      return 'Sala Apagada'
    }else{
      return 'Não foi possivel Apagar'
    }
  }

  public async adicionarAluno({params}: HttpContextContract) {
    const { matricula , numeroSala, matriculaAluno} = params
    const prof:Professor|null = await Professor.findOrFail(matricula)
    const sala:Sala|null = await prof.related('salas').query().where('numeroSala',numeroSala).first();
    const alunos = await sala?.related('alunos').query();
    const alunosAtuais = alunos?.length ?? 0
    const capacidadeAlunos = sala?.capacidadeAlunos ?? 0
    let existeAluno:boolean = false
    
    await sala?.related('alunos').query().where('alunos.matriculaAluno',matriculaAluno).first().then((aluno) => {
      existeAluno = aluno instanceof Aluno
    })
    if(existeAluno){
      return 'Ja existe um Aluno Cadastrado'
    }else{
      if(alunosAtuais < capacidadeAlunos ){
      
      await sala?.related('alunos').attach([matriculaAluno])
      return 'Aluno Cadastrado Com Sucesso' 
      }else{
        return 'capacidade maxima atiginda'
      }
    }
}

public async deletarAluno({params}: HttpContextContract) {
  const { matricula , numeroSala, matriculaAluno} = params

  const prof:Professor|null = await Professor.findOrFail(matricula)
  const sala:Sala|null = await prof.related('salas').query().where('numeroSala',numeroSala).first();
  await sala?.related('alunos').detach([matriculaAluno])
  return await sala?.related('alunos').query()
}

public async listarAlunos({params}: HttpContextContract) {
  const { matricula , numeroSala} = params

  const prof:Professor|null = await Professor.findOrFail(matricula)
  const sala:Sala|null = await prof.related('salas').query().where('numeroSala',numeroSala).first();

  return await sala?.related('alunos').query()
}
}

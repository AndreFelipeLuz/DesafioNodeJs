import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  public async index({params}: HttpContextContract) {
    const { matricula } = params
    
    return await Aluno.findOrFail(matricula)
 }

  public async store({request}: HttpContextContract) {
    const aluno:Aluno = await Aluno.create(request.all())
    console.log(aluno)

    return 'Aluno Criado com sucesso'
  }


  public async update({request,params}: HttpContextContract) {
    const { matricula } = params

    const aluno:Aluno|null = await Aluno.findOrFail(matricula)
    aluno.nome = request.input('nome')
    aluno.email = request.input('email')
    aluno.dataDeNascimento = request.input('dataDeNascimento')

    await aluno.save()
    return 'Aluno Atualizado'
  }

  public async destroy({request}: HttpContextContract) {
    const aluno:Aluno|null = await Aluno.findOrFail(request.param('matricula'))
    if(aluno != null){
      aluno.delete()
      return 'Aluno deletado com sucesso'
    }else{
      return 'Não foi possivel Deletar o Aluno Cadastrado'
    }
     
  }
}

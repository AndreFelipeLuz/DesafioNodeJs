import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'

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
}

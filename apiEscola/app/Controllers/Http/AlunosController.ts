import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  public async read({ params, response }: HttpContextContract) {

    try {
      const { matricula } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else {
        const aluno = await Aluno.find(matricula)
        if (aluno instanceof Aluno) {
          return response.status(200).send({ Mensagem: 'Aluno Encontrado', Aluno: aluno })
        } else {
          return response.status(404).send({ Erro: 'Aluno não encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async create({ response, request }: HttpContextContract) {
    try {
      const dataInvalida = new Date(request.input('dataDeNascimento')).toDateString() === 'Invalid Date'
      if (typeof (request.input('nome')) === 'string' && typeof (request.input('email')) === 'string' && dataInvalida == false) {
        const aluno: Aluno = await Aluno.create(request.all())
        return response.status(200).send({ Mensagem: 'Aluno Criado com sucesso', Aluno: aluno })
      } else {
        return response.status(400).send({ Erro: 'Parâmetros inválidos' })
      }
    } catch (error) {
      return response.status(500).send({ Mensagem: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { matricula } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else {
        const aluno = await Aluno.find(matricula)
        if (aluno instanceof Aluno) {
          if (new Date(request.input('dataDeNascimento')).toDateString() === 'Invalid Date' && (typeof (request.input('dataDeNascimento') !== 'string'))) {
            return response.status(400).send({ erro: 'Insira uma data Valida' })
          } else {
            aluno.nome = request.input('nome')
            aluno.email = request.input('email')
            aluno.dataDeNascimento = request.input('dataDeNascimento')

            await aluno.save()
            return response.status(200).send({ Mensagem: 'Aluno Atualizado Com Sucesso' })
          }
        } else {
          return response.status(404).send({ Erro: 'Aluno não encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const { matricula } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else {
        const aluno = await Aluno.find(matricula)
        if (aluno instanceof Aluno) {
          await aluno.delete()

          return response.status(200).send({ Mensagem: 'Aluno deletado' })
        } else {
          return response.status(404).send({ Erro: 'Aluno não encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Mensagem: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async readSalas({ params, response }: HttpContextContract) {
    try {
      const { matricula } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else {
        const aluno = await Aluno.find(matricula)
        if (aluno instanceof Aluno) {
          const salas = await aluno.related('salas').query().preload('professor')
          const dados = salas.map((sala) => {
            return {
              Numero_Da_Sala: sala.numeroSala,
              Nome_do_Professor: sala.professor.nome
            }
          })
          return response.status(200).send({ Nome_Do_Aluno: aluno.nome, Salas: dados })
        } else {
          return response.status(404).send({ Erro: 'Aluno não encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Mensagem: 'Ocorreu um Erro desconhecido' })
    }
  }
}

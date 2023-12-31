import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Professor from 'App/Models/Professor'
import Sala from 'App/Models/Sala'

export default class ProfessorsController {
  public async read({ params, response }: HttpContextContract) {
    try {
      const { matricula } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else {
        const prof = await Professor.find(matricula)
        if (prof instanceof Professor) {
          return response.status(200).send({ Mensagem: 'Professor Encontrado', Professor: prof })
        } else {
          return response.status(404).send({ Erro: 'Professor não encontrado' })
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
        const prof: Professor = await Professor.create(request.all())
        return response.status(200).send({ Mensagem: 'Professor Criado com sucesso', Professor: prof })
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
        const prof = await Professor.find(matricula)
        if (prof instanceof Professor) {
          if (new Date(request.input('dataDeNascimento')).toDateString() === 'Invalid Date' && (typeof (request.input('dataDeNascimento') !== 'string'))) {
            return response.status(400).send({ erro: 'Insira uma data Valida' })
          } else {
            prof.nome = request.input('nome')
            prof.email = request.input('email')
            prof.dataDeNascimento = request.input('dataDeNascimento')

            await prof.save()
            return response.status(200).send({ Mensagem: 'Professor Atualizado Com Sucesso' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor não encontrado' })
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
        const prof = await Professor.find(matricula)
        if (prof instanceof Professor) {
          await prof.delete()

          return response.status(200).send({ Mensagem: 'Professor deletado' })
        } else {
          return response.status(404).send({ Erro: 'Professor não encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async readSala({ response, params }: HttpContextContract) {
    try {
      const { matricula, numeroSala } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else if (isNaN(parseInt(numeroSala))) {
        return response.status(400).send({ Erro: 'Numero De Sala inválido' })
      } else {
        const prof: Professor | null = await Professor.find(matricula)
        if (prof instanceof Professor) {
          const salaEspecifica = await prof.related('salas').query().where('numeroSala', numeroSala).first();
          if (salaEspecifica instanceof Sala) {
            return response.status(200).send({ Mensagem: 'Sala Encontrada', Sala: salaEspecifica })
          } else {
            return response.status(404).send({ Erro: 'Sala Não Encontrada' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não Encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async createSala({ response, request, params }: HttpContextContract) {
    try {
      const { matricula } = params

      if (isNaN(parseInt(matricula))) {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      } else {
        const prof = await Professor.find(matricula)
        if (prof instanceof Professor) {
          if (parseInt(request.input('capacidadeAlunos')) >= 5) {
            const sala = await prof.related('salas').create(request.all())
            sala.matriculaProfessor = matricula
            await sala.save()

            return response.status(200).send({ Mensagem: 'Sala Criada Com Sucesso', Sala: sala })
          } else {
            return response.status(403).send({ Erro: 'Digite um numero maior ou igual a 5' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não Encontrado' })
        }
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async updateSala({ response, request, params }: HttpContextContract) {
    try {
      const { matricula, numeroSala } = params

      if (!(isNaN(parseInt(matricula))) && !(isNaN(parseInt(numeroSala)))) {
        const prof: Professor | null = await Professor.find(matricula)
        if (prof instanceof Professor) {
          const sala = await prof.related('salas').query().where('numeroSala', numeroSala).first();
          if (sala instanceof Sala) {
            if (parseInt(request.input('capacidadeAlunos')) >= 5) {
              const quantAlunos = (await sala.related('alunos').query()).length
              if (quantAlunos <= request.input('capacidadeAlunos')) {
                sala.capacidadeAlunos = request.input('capacidadeAlunos')
                if (quantAlunos == request.input('capacidadeAlunos')) {
                  sala.disponibilidade = false
                } else {
                  sala.disponibilidade = true
                }
                await sala.save()
                return response.status(200).send({ Mensagem: 'Sala foi atualizada com Sucesso' })
              } else {
                return response.status(403).send({ Erro: 'Digite uma capacidade De sala Maior do que a dos estudantes ja cadastrados atualmente' })
              }
            } else {
              return response.status(403).send({ Erro: 'Digite uma capacidade De sala Maior iu igual a 5' })
            }
          } else {
            return response.status(404).send({ Erro: 'Sala Não foi encontrada ou não existe' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não foi encontrado ou não existe' })
        }
      } else {
        return response.status(400).send({ Erro: 'Matricula ou Numero de Sala inválida' })
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async deleteSala({ params, response }: HttpContextContract) {
    try {
      const { matricula, numeroSala } = params

      if (!(isNaN(parseInt(matricula))) && !(isNaN(parseInt(numeroSala)))) {
        const prof: Professor | null = await Professor.find(matricula)
        if (prof instanceof Professor) {
          const sala = await prof.related('salas').query().where('numeroSala', numeroSala).first();
          if (sala instanceof Sala) {
            sala.delete()
            return response.status(200).send({ Mensagem: 'Sala foi apagada com Sucesso' })
          } else {
            return response.status(404).send({ Erro: 'Sala Não foi encontrada ou não existe' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não foi encontrado ou não existe' })
        }
      } else {
        return response.status(400).send({ Erro: 'Matricula ou Numero inválido' })
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async adicionarAluno({ params, response }: HttpContextContract) {
    try {
      const { matricula, numeroSala, matriculaAluno } = params

      if (!(isNaN(parseInt(matricula))) && !(isNaN(parseInt(numeroSala))) && !(isNaN(parseInt(matriculaAluno)))) {
        const prof: Professor | null = await Professor.find(matricula)
        if (prof instanceof Professor) {
          const sala: Sala | null = await prof.related('salas').query().where('numeroSala', numeroSala).first();
          if (sala instanceof Sala) {
            const alunosAtuais = (await sala.related('alunos').query()).length
            const capacidadeAlunos = sala.capacidadeAlunos
            const existeAluno = await sala.related('alunos').query().where('alunos.matriculaAluno', matriculaAluno).first() instanceof Aluno
            if (existeAluno) {
              return response.status(409).send({ Erro: 'Ja existe um Aluno Cadastrado' })
            } else {
              await sala.related('alunos').attach([matriculaAluno])
              if (alunosAtuais < capacidadeAlunos) {
                if (capacidadeAlunos == alunosAtuais) {
                  sala.disponibilidade = false
                  await sala.save()
                }
                return response.status(200).send({ Mensagem: 'Aluno Cadastrado Com Sucesso' })
              } else {
                return response.status(403).send({ Erro: 'Capacidade Maxima Atiginda' })
              }
            }
          } else {
            return response.status(404).send({ Erro: 'Sala Não foi encontrada ou não existe' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não foi encontrado ou não existe' })
        }
      } else {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async deletarAluno({ params, response }: HttpContextContract) {
    try {
      const { matricula, numeroSala, matriculaAluno } = params

      if (!(isNaN(parseInt(matricula))) && !(isNaN(parseInt(numeroSala))) && !(isNaN(parseInt(matriculaAluno)))) {
        const prof: Professor | null = await Professor.find(matricula)
        if (prof instanceof Professor) {
          const sala: Sala | null = await prof.related('salas').query().where('numeroSala', numeroSala).first();
          if (sala instanceof Sala) {
            const existeAluno = await sala.related('alunos').query().where('alunos.matriculaAluno', matriculaAluno).first() instanceof Aluno
            if (existeAluno) {
              await sala.related('alunos').detach([matriculaAluno])
              return response.status(200).send({ Mensagem: 'Aluno Apagado com Sucesso' })
            } else {
              return response.status(404).send({ Erro: 'Aluno Não foi encontrada ou não existe' })
            }
          } else {
            return response.status(404).send({ Erro: 'Sala Não foi encontrada ou não existe' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não foi encontrado ou não existe' })
        }
      } else {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }

  public async listarAlunos({ params, response }: HttpContextContract) {
    try {
      const { matricula, numeroSala } = params

      if (!(isNaN(parseInt(matricula))) && !(isNaN(parseInt(numeroSala)))) {
        const prof: Professor | null = await Professor.find(matricula)
        if (prof instanceof Professor) {
          const sala: Sala | null = await prof.related('salas').query().where('numeroSala', numeroSala).first();
          if (sala instanceof Sala) {
            const alunos = await sala.related('alunos').query()
            if (alunos.length === 0) {
              return response.status(404).send({ Erro: 'Lista de Alunos Não foi encontrada ou não existe' })
            } else {
              return response.status(200).send({ Memsagem: 'Alunos Achados', Alunos: await sala.related('alunos').query() })
            }
          } else {
            return response.status(404).send({ Erro: 'Sala Não foi encontrada ou não existe' })
          }
        } else {
          return response.status(404).send({ Erro: 'Professor Não foi encontrado ou não existe' })
        }
      } else {
        return response.status(400).send({ Erro: 'Matricula inválida' })
      }
    } catch (error) {
      return response.status(500).send({ Erro: 'Ocorreu um Erro desconhecido' })
    }
  }
}

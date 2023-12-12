import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public numeroSala: number
  
  @column()
  public MatriculaProfessor:number

  @column()
  public capacidadeAlunos:number
  
  @column()
  public disponibilidade: boolean

  @manyToMany(() => Aluno,{
    pivotForeignKey: 'MatriculaAluno'
  })
  public aluno: ManyToMany<typeof Aluno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

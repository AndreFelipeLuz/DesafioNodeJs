import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno'

export default class Sala extends BaseModel {
  @column({ isPrimary: true ,columnName: 'numeroSala'})
  public numeroSala: number
  
  @column({columnName: "MatriculaProfessor"})
  public matriculaProfessor:number

  @column({columnName: 'capacidadeAlunos'})
  public capacidadeAlunos:number
  
  @column({columnName:'disponibilidade'})
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

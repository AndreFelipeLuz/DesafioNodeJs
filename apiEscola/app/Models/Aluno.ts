import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Aluno extends BaseModel {
  @column({columnName : 'MatriculaAluno', isPrimary: true })
  public matriculaAluno: number

  @column({columnName: 'Nome'})
  public nome: String

  @column({columnName: 'Email'})
  public email: String

  @column({columnName: 'DataDeNascimento'})
  public dataDeNascimento:Date

  @manyToMany(() => Sala,{
    localKey: 'matriculaAluno',
    pivotForeignKey: 'MatriculaAluno',
    relatedKey: 'numeroSala',
    pivotRelatedForeignKey: 'numeroSala',
    pivotTable: 'sala_aluno'
  })
  public salas: ManyToMany<typeof Sala>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

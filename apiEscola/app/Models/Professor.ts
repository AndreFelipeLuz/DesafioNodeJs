import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Professor extends BaseModel {
  @column({ isPrimary: true , columnName: 'MatriculaProfessor'})
  public matriculaProfessor: number

  @column({columnName: 'Nome'})
  public nome: String

  @column({columnName: 'Email'})
  public email: String

  @column({columnName: 'DataDeNascimento'})
  public dataDeNascimento:Date

  @hasMany(() => Sala, {
    localKey: 'matriculaProfessor',
    foreignKey: 'matriculaProfessor'
  })
  public salas:HasMany<typeof Sala>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

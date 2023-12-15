import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno'
import Professor from './Professor'

export default class Sala extends BaseModel {
  @column({ isPrimary: true, columnName: 'numeroSala' })
  public numeroSala: number

  @column({ columnName: "MatriculaProfessor" })
  public matriculaProfessor: number

  @column({ columnName: 'capacidadeAlunos' })
  public capacidadeAlunos: number

  @column({ columnName: 'disponibilidade' })
  public disponibilidade: boolean

  @manyToMany(() => Aluno, {
    localKey: 'numeroSala',
    pivotForeignKey: 'numeroSala',
    relatedKey: 'matriculaAluno',
    pivotRelatedForeignKey: 'MatriculaAluno',
    pivotTable: 'sala_aluno'
  })
  public alunos: ManyToMany<typeof Aluno>

  @hasOne(() => Professor, {
    localKey: 'matriculaProfessor',
    foreignKey: 'matriculaProfessor'
  })
  public professor: HasOne<typeof Professor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

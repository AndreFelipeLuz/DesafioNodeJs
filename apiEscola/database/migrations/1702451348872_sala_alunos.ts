import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sala_aluno'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('numeroSala')
        .unsigned()
        .references('numeroSala')
        .inTable('salas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('MatriculaAluno')
        .unsigned()
        .references('MatriculaAluno')
        .inTable('alunos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

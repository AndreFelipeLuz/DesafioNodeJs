import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('numeroSala')
      table
        .integer('MatriculaProfessor')
        .unsigned()
        .references('MatriculaProfessor')
        .inTable('professors')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('capacidadeAlunos')
      table.boolean('disponibilidade')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

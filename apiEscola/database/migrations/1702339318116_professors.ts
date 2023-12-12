import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('MatriculaProfessor')
      table.string('Nome')
      table.string('Email')
      table.date('DataDeNascimento')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

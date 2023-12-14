import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('capacidadeAlunos').notNullable().alter()
      table.boolean('disponibilidade').notNullable().defaultTo(true).alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('capacidadeAlunos').nullable().alter()
      table.boolean('disponibilidade').nullable().alter()
    })
  }
}

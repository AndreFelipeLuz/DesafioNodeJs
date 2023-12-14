import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professors'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('Nome').notNullable().alter()
      table.string('Email').notNullable().alter()
      table.date('DataDeNascimento').notNullable().alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('Nome').nullable().alter()
      table.string('Email').nullable().alter()
      table.date('DataDeNascimento').nullable().alter()
    })
  }
}

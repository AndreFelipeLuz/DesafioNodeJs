
import Route from '@ioc:Adonis/Core/Route'

//Alunos

Route.post('/aluno', 'AlunosController.create')
Route.get('/aluno/:matricula','AlunosController.read')
Route.put('/aluno/:matricula','AlunosController.update')
Route.delete('/aluno/:matricula','AlunosController.delete')
Route.get('/aluno/verSalas/:matricula', 'AlunosController.readSalas')

//Professores

Route.post('/professor', 'ProfessorsController.create')
Route.get('/professor/:matricula','ProfessorsController.read')
Route.put('/professor/:matricula','ProfessorsController.update')
Route.delete('/professor/:matricula','ProfessorsController.delete')

Route.post('/professor/Sala/:matricula','ProfessorsController.storeSala')
Route.get('/professor/Sala/:matricula/:numeroSala','ProfessorsController.readSala')
Route.put('/professor/Sala/:matricula/:numeroSala','ProfessorsController.updateSala')
Route.delete('/professor/Sala/:matricula/:numeroSala','ProfessorsController.deleteSala')
Route.put('/AdicionarAluno/:matricula/:numeroSala/:matriculaAluno','ProfessorsController.adicionarAluno')
Route.delete('/removerAluno/:matricula/:numeroSala/:matriculaAluno', 'ProfessorsController.deletarAluno' )
Route.get('listarAlunos/:matricula/:numeroSala', 'ProfessorsController.listarAlunos' )
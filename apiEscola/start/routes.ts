
import Route from '@ioc:Adonis/Core/Route'

//Alunos

Route.post('/aluno/cadastrarAluno', 'AlunosController.store')
Route.put('/aluno/atualizarAluno/:matricula','AlunosController.update')
Route.delete('/aluno/excluirCadastro/:matricula','AlunosController.destroy')
Route.get('/aluno/verAluno/:matricula','AlunosController.index')
Route.get('/aluno/verSalas/:matricula', 'AlunosController.verSalas')

//Professores

Route.post('/professor/cadastrarProfessor', 'ProfessorsController.store')
Route.put('/professor/atualizarProfessor/:matricula','ProfessorsController.update')
Route.delete('/professor/excluirCadastro/:matricula','ProfessorsController.destroy')
Route.get('/professor/verProfessor/:matricula','ProfessorsController.index')
Route.post('/professor/cadastrarSala/:matricula','ProfessorsController.storeSala')
Route.put('/professor/atualizarSala/:matricula/:numeroSala','ProfessorsController.updateSala')
Route.delete('/professor/deletarSala/:matricula/:numeroSala','ProfessorsController.destroySala')
Route.get('/professor/verSala/:matricula/:numeroSala','ProfessorsController.indexSala')
Route.put('/AdicionarAluno/:matricula/:numeroSala/:matriculaAluno','ProfessorsController.adicionarAluno')
Route.delete('/removerAluno/:matricula/:numeroSala/:matriculaAluno', 'ProfessorsController.deletarAluno' )
Route.get('listarAlunos/:matricula/:numeroSala', 'ProfessorsController.listarAlunos' )

import Route from '@ioc:Adonis/Core/Route'

//Alunos

Route.post('/aluno/cadastrarAluno', 'AlunosController.store')
Route.put('/aluno/atualizarAluno/:matricula','AlunosController.update')
Route.delete('/aluno/excluirCadastro/:matricula','AlunosController.destroy')
Route.get('/aluno/verAluno/:matricula','AlunosController.index')

//Professores

Route.post('/professor/cadastrarProfessor', 'ProfessorsController.store')
Route.put('/professor/atualizarProfessor/:matricula','ProfessorsController.update')
Route.delete('/professor/excluirCadastro/:matricula','ProfessorsController.destroy')
Route.get('/professor/verProfessor/:matricula','ProfessorsController.index')

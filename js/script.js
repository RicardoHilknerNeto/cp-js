const button = document.querySelector('.button-add-task')
const inputTask = document.querySelector('.input-task')
const inputName = document.querySelector('.input-name')
const inputDepartment = document.querySelector('.input-department')
const inputImport = document.querySelector('.input-import')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    name: inputName.value,
    tarefa: inputTask.value,
    import: inputImport.value,
    department: inputDepartment.value,
    concluida: false,
  })

  inputName.value = ''
  inputTask.value = ''
  inputImport.value = ''
  inputDepartment.value = ''

  mostrarTarefas()
}

function mostrarTarefas() {
  let novaLi = ''

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `

        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.name}</p>
            <p>${item.department}</p>
            <p>${item.tarefa}</p>
            <p>${item.import}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        
        `
  })

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)

  mostrarTarefas()
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)
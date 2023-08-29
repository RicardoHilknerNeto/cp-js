const button = document.querySelector('.button-add-task')
const inputTask = document.querySelector('.input-task')
const inputName = document.querySelector('.input-name')
const inputDepartment = document.querySelector('.input-department')
const inputImport = document.querySelector('.input-import')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

function adicionarNovaTarefa(valor) {
  minhaListaDeItens.push({
    name: inputName.value,
    tarefa: inputTask.value,
    import: inputImport.value,
    department: inputDepartment.value,
    valor: valor, // Adicione o valor à propriedade 'valor'
    concluida: false,
  });

  inputName.value = '';
  inputTask.value = '';
  inputImport.value = '';
  inputDepartment.value = '';

  mostrarTarefas();
}


button.addEventListener('click', function () {
  var resposta = confirm('Deseja adicionar um valor?');

  if (resposta) {
    var valor = prompt('Digite o valor:');
    if (valor !== null) {
      adicionarNovaTarefa(valor); // Chama a função com o valor inserido
    } else {
      alert('Nenhum valor foi adicionado.');
    }
  } else {
    alert('Você selecionou "Não".');
  }
});




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
            <p>R$ ${item.valor}</p>
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
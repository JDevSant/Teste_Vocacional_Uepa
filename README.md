# Teste Vocacional | UEPA

Site do **Teste de Afinidade Acadêmica** desenvolvido para apresentar os cursos do Campus XX da UEPA em Castanhal e oferecer uma experiência interativa de orientação inicial.

> **Importante:** esta versão mantém o design e a identidade visual do projeto original. A reorganização foi feita para facilitar manutenção, documentação e publicação no GitHub, sem redesenhar a interface.

## Estrutura

```text
Teste_Vocacional/
├── assets/
│   ├── uepa-header-logo.png
│   └── uepa-home-logo.png
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── app.js
├── docs/
│   ├── ESTRUTURA.md
│   └── MANUTENCAO.md
├── index.html
├── LICENSE
└── .gitignore
```

## Tecnologias

- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- Google Fonts
- GitHub Pages

Não é necessário instalar Node.js, npm ou qualquer framework para executar o projeto.

## Como executar

Abra `index.html` em um navegador ou publique o repositório pelo GitHub Pages.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para o repositório.
3. Acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione a branch que contém o projeto e a pasta `/ (root)`.
5. Salve e aguarde a publicação.

## Organização do código

### `index.html`
Contém somente a estrutura da página: cabeçalho, Home, questionário, resultado e modal dos cursos.

### `css/style.css`
Contém toda a aparência visual do projeto. As regras de responsividade também ficam neste arquivo.

### `js/data.js`
Concentra os dados que alimentam o teste:

- cursos;
- descrições;
- justificativas dos resultados;
- links dos PPCs;
- perguntas;
- alternativas;
- pesos de cada alternativa.

### `js/app.js`
Contém a lógica de funcionamento:

- navegação entre Home, teste e resultado;
- renderização das perguntas;
- seleção das alternativas;
- cálculo das pontuações;
- resultado e ranking;
- modal dos cursos;
- atalhos de teclado.

## Observação sobre o design

A separação dos arquivos foi feita sem alterar propositalmente a estética original do site. O CSS original foi apenas movido do HTML para `css/style.css`, e o JavaScript foi separado em dados (`data.js`) e lógica (`app.js`).

## Licença

Projeto acadêmico para uso relacionado às atividades da UEPA.

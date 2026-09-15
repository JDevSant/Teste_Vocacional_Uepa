# Guia de manutenção

## Alterar uma pergunta

Abra `js/data.js` e localize a pergunta desejada dentro de `questions`. Cada pergunta possui:

- `cat`: categoria exibida acima da pergunta;
- `note`: texto auxiliar;
- `q`: enunciado;
- `a`: alternativas.

Cada alternativa possui o texto e um objeto de pesos. Os números dos pesos correspondem à posição dos cursos no array `courses`, começando em `0`.

## Alterar um curso

No mesmo arquivo, edite um item do array `courses`. Cada curso possui:

- `name`: nome;
- `desc`: descrição curta;
- `why`: explicação do resultado;
- `ppc`: endereço do PPC ou página relacionada.

## Alterar a aparência

Edite `css/style.css`. As principais cores estão reunidas nas variáveis do bloco `:root`, no início do arquivo.

## Trocar imagens

Substitua os arquivos dentro de `assets/` mantendo os mesmos nomes para não precisar alterar o HTML:

- `uepa-header-logo.png`: logo exibida no cabeçalho;
- `uepa-home-logo.png`: imagem principal da Home.

## Alterar a lógica

Use `js/app.js` para alterações de comportamento. Evite colocar dados de cursos e perguntas nesse arquivo: eles devem permanecer em `data.js`.

## Cuidados

- Não renomeie IDs usados pelo JavaScript sem atualizar `app.js`.
- Se adicionar perguntas, mantenha o formato existente.
- Se adicionar ou remover cursos, revise os pesos das alternativas.
- Teste o site no desktop e no celular depois de alterações importantes.

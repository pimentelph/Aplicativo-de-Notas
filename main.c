#include <stdio.h>
#include <stdbool.h>
#include <string.h>

struct notas {
    char titulo[50];
    char conteudo[120];
    char categoria[50];
};

int main(void) {
    struct notas notas[100];
    int numNotas = 0, escolhaMenu;
    bool saida = true;

    printf("--------------------Aplicativo de Notas--------------------\n");

    do {
        printf("\nO que deseja fazer?\n");
        printf("1 - Criar uma nota\n");
        printf("2 - Visualizar notas\n");
        printf("3 - Visualizar notas de uma categoria especifica\n");
        printf("4 - Editar nota\n");
        printf("5 - Deletar nota\n");
        printf("6 - Sair do programa\n\n");
        scanf("%d", &escolhaMenu);
        getchar();  // Limpa o '\n' do buffer de entrada

        switch (escolhaMenu) {
            case 1: {
              printf("\nDigite o título da sua nota: \n");
              scanf("%[^\n]s", notas[numNotas].titulo);
              getchar();  // Limpa o '\n' do buffer depois a leitura
              
              printf("\nDigite a categoria da sua nota: \n");
              scanf("%[^\n]s", notas[numNotas].categoria);
              getchar();  // Limpa o '\n' do buffer depois a leitura

              printf("\nDigite o conteúdo da sua nota: \n");
              scanf("%[^\n]s", notas[numNotas].conteudo);
              getchar();  // Limpa o '\n' do buffer depois a leitura

              printf("\nNota adicionada com sucesso!\n");
              numNotas++;
              break;
            }
            case 2: {
              printf("\nNotas cadastradas: \n");
              for (int i = 0; i < numNotas; i++) {
                  printf("Título: %s\n", notas[i].titulo);
                  printf("Categoria: %s\n", notas[i].categoria);
                  printf("%s\n", notas[i].conteudo);
                  printf("\n------------------------------------------------------------------\n");
              }
              break;
            }
            case 3: {

              char categoria[50];
              int posicao = -1;

              printf("\nDigite o nome da categoria que deseja buscar: \n");
              scanf("%[^\n]s", categoria);
              getchar();  // Limpa o '\n' do buffer depois a leitura

              for (int i = 0; i < numNotas; i++) {
                  if (strcmp(categoria, notas[i].categoria) == 0) {
                      posicao = i;
                      printf("Nota encontrada!\n");
                      break;
                  }
              }

              if (posicao == -1) {
                printf("Nota não encontrada.\n");
              } else {
                printf("Notas cadastradas da categoria %s: \n\n", categoria);
                for (int i = 0; i < numNotas; i++) {
                  if(strcmp(categoria, notas[i].categoria) == 0){
                    printf("Título: %s\n", notas[i].titulo);
                    printf("%s\n", notas[i].conteudo);
                    printf("\n------------------------------------------------------------------\n");
                  }
                }
              }

              break;
            }
            case 4: {
                int posicao = -1;
                char titulo[50];
                printf("\nDigite o título da nota que deseja editar: \n");
                scanf("%[^\n]s", titulo);
                getchar();  // Limpa o '\n' do buffer depois a leitura

                for (int i = 0; i < numNotas; i++) {
                    if (strcmp(titulo, notas[i].titulo) == 0) {
                        posicao = i;
                        printf("Nota encontrada!\n");
                        break;
                    }
                }

                if (posicao == -1) {
                    printf("Nota não encontrada.\n");
                } else {
                    printf("\nEdite o título da sua nota: \n");
                    scanf("%[^\n]s", notas[posicao].titulo);
                    getchar();  // Limpa o '\n' do buffer depois a leitura

                    printf("\nEdite o conteúdo da sua nota: \n");
                    scanf("%[^\n]s", notas[posicao].conteudo);
                    getchar();  // Limpa o '\n' do buffer depois a leitura

                    printf("\nNota editada com sucesso!\n");
                }
                break;
            }
            case 5: {
              int posicao = -1;
              char titulo[50];
              printf("\nDigite o título da nota que deseja excluir: \n");
              scanf("%[^\n]s", titulo);
              getchar();  // Limpa o '\n' do buffer depois a leitura

              for (int i = 0; i < numNotas; i++) {
                  if (strcmp(titulo, notas[i].titulo) == 0) {
                      posicao = i;
                      break;
                  }
              }

              if (posicao == -1) {
                printf("Nota não encontrada.\n");
              } else {
                // Desloca todas as notas seguintes uma posição para trás
                for (int i = posicao; i < numNotas - 1; i++) {
                    notas[i] = notas[i + 1];
                }
                numNotas--;  // Diminui o número de notas no array de notas
                printf("Nota deletada com sucesso!\n");
              }
              
              break;
            }
            case 6: {
              printf("Programa encerrado, muito obrigado!\n");
              saida = false;
              break;
            }
            default:
              printf("\nEntrada inválida, por favor coloque uma entrada válida!\n");
        }
    } while (saida);

    return 0;
}

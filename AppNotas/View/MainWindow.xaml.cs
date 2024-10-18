using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace AppNotas
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            comboBoxFundo.Items.Add("Tema Escuro");
            comboBoxFundo.Items.Add("Tema Claro");

            MudarTema("TemaEscuro.xaml");

            comboBoxFundo.SelectedIndex = 0;
        }

        private void verNotas(object sender, RoutedEventArgs e)
        {

        }

        private void adicionarNota(object sender, RoutedEventArgs e)
        {

        }

        private void MudarTema(string nomeDoTema)
        {
            // Caminho ajustado para a pasta "View"
            var uri = new Uri($"View/{nomeDoTema}", UriKind.Relative);
            var resourceDict = new ResourceDictionary { Source = uri };

            // Limpar o antigo e adicionar o novo ResourceDictionary
            Application.Current.Resources.MergedDictionaries.Clear();
            Application.Current.Resources.MergedDictionaries.Add(resourceDict);
        }

        private void comboBoxFundo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (comboBoxFundo.SelectedIndex == 0)
            {
                MudarTema("TemaEscuro.xaml");
            }
            else if (comboBoxFundo.SelectedIndex == 1)
            {
                MudarTema("TemaClaro.xaml");
            }
        }
    }
}
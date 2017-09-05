using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;

namespace MyTunes
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        protected override async void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);

            this.DataContext = await SongLoader.Load();
        }
    }
}

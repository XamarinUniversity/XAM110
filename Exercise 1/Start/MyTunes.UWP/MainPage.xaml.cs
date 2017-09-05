using System.Linq;
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

        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);

            var tempData = Enumerable.Range(1, 3).Select(i =>
            {
                return new
                {
                    Name = "Song" + i,
                    Artist = "Artist" + i,
                    Album = "Album" + i
                };
            }).ToList();

            this.DataContext = tempData;
        }
    }
}

using UIKit;
using System.Linq;

namespace MyTunes
{
	public class MyTunesViewController : UITableViewController
	{
		public override void ViewDidLayoutSubviews()
		{
			base.ViewDidLayoutSubviews();

			TableView.ContentInset = new UIEdgeInsets (20, 0, 0, 0);
		}

		public async override void ViewDidLoad()
		{
			base.ViewDidLoad();

			// Load the data
            var data = await SongLoader.Load();

			// Register the TableView's data source
			TableView.Source = new ViewControllerSource<Song>(TableView) {
				DataSource = data.ToList(),
				TextProc = s => s.Name,
				DetailTextProc = s => s.Artist + " - " + s.Album,
			};
		}
	}

}


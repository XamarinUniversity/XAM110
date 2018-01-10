using System.Net.Http;

namespace MyTunes
{
    public static class SongExtensions
    {
        static HttpClient httpClient = new HttpClient();

        public static string RuinSongName(this string songName)
        {
            return songName.Replace("Crocodile", "Alligator");
        }
    }
}
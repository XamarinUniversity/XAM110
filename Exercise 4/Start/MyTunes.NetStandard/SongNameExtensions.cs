using System;
using System.Net.Http;

namespace MyTunes.NetStandard
{
    public static class SongNameExtensions
    {
        public static HttpClient httpClient = new HttpClient();
        public static string RuinSongName(this string songName)
        {
            return songName.Replace("Crocodile", "Alligator");
        }
    }
}

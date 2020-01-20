import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {Router} from '@angular/router';
import {PlaylistService} from '../playlist.service';
import {DataTransferService} from '../../data-transfer.service';
import {Song} from '../../song/Song';
import {SongService} from '../../song/song.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent implements OnInit {

  playlistById: Playlist;
  playlist: Playlist[];
  songList: Song[];
  $searchName: Observable<any>;

  constructor(private router: Router,
              private playlistService: PlaylistService,
              private songService: SongService,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.searchPlaylist();
    this.$searchName = this.dataTransfer.getDataAsObservarble();
    this.$searchName.subscribe(playlist => {
      console.log(playlist);
      this.playlist = playlist;
    });

    this.loadSongList();
  }

  searchPlaylist() {
    const tmp = this.dataTransfer.getData();
    if (tmp === undefined) {
      this.loadPlaylist();
    } else {
      this.playlist = tmp;
    }
  }

  loadPlaylist() {
    this.playlistService.getPlaylist().subscribe(result => {
      this.playlist = result;
    });
  }

  goToPlaylistDetail(id: number) {
    this.playlistService.getPlaylistById(id).subscribe(result => {
      this.playlistById = result;
      this.dataTransfer.setData(this.playlistById);
      this.router.navigateByUrl('/playlist/detail-playList');
    });
  }

  loadSongList() {
    this.songService.getSongList().subscribe(data => {
      this.songList = data;
      this.dataTransfer.setDataSong(this.songList);
    });
  }

  Search(event) {
    const search = event.target.value;
    if (search === '') {
      this.playlistService.getPlaylist().subscribe(result => {
        const playlists = result;
        this.dataTransfer.setData(playlists);
      });
    } else {
      this.playlistService.searchByNamePlaylist(search).subscribe(result => {
        const playlists = result;
        this.dataTransfer.setData(playlists);
        // this.router.navigateByUrl('/playlist');
      });
    }
  }


}

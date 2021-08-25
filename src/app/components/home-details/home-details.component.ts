import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/models/anime.model';
import { AnimeService } from 'src/app/services/anime.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss']
})
export class HomeDetailsComponent implements OnInit {

  currentAnime: Anime = {
    id: '',
    title: '',
    genre: '',
    synopsis: '',
    aired: '',
    ended: '',
    rating: '',
    fileDB: '',
  }

  fileDB?: any;
  content: any;
  isLoggedIn = false;
  private roles: string[] = [];
  username?: string;

  constructor(private animeService: AnimeService,
    private userService:UserService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.getAnime(this.route.snapshot.params.id);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    console.log(this.username);

  }

  getAnime(id: any): void {
    this.animeService.get(id)
      .subscribe(
        data => {
          this.currentAnime = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}

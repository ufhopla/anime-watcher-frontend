import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/models/anime.model';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {

  currentAnime: Anime = {
    title: '',
    genre: '',
    synopsis: '',
    aired: '',
    ended: '',
    rating: ''
  };
  message = '';

  constructor(
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getAnime(this.route.snapshot.params.id);
  }

  getAnime(id: string): void {
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

  updateAnime(): void {
    this.message = '';

    this.animeService.update(this.currentAnime.id, this.currentAnime)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This anime was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteAnime(): void {
    this.animeService.delete(this.currentAnime.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/animes']);
        },
        error => {
          console.log(error);
        });
  }
}
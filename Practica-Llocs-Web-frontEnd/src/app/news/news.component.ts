import { Component, inject } from '@angular/core';
import { NewsService } from "../services/news.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from '../services/estadisticas.service';
import  {WalletService} from '../services/wallet.service';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  news: any[] = [];
  filteredNews: any[] = [];
  showForm = false;
  showEditForm = false;
  newTitle = '';
  newBody = '';
  newCategory: string[] = [];
  currentUser: string | null = null;
  selectedCategory: string = '';
  selectedCategories: string[] = [];
  editNewsItem: any = null;

  private newsService = inject(NewsService);
  private estadisticasService = inject(EstadisticasService);
  private walletService = inject(WalletService);
  userId: string | null = null;
  private intervalId: any;
  constructor() { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.registrarVisita('ultimesnoticies');
    this.newsService.getNews().subscribe((data: any[]) => {
      this.news = data;
      this.filteredNews = data;
    });
    if (this.userId) {
      this.intervalId = setInterval(() => {
        this.fetchUserName();
      }, 1000);
      this.walletService.getUserName(this.userId).subscribe((userName: string) => {
        this.currentUser = userName;
      });
    }
  }
  fetchUserName() {
    throw new Error('Method not implemented.');
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitNews() {
    const newNews = {
      title: this.newTitle,
      body: this.newBody,
      category: this.newCategory
    };
    this.newsService.addNews(newNews).subscribe((data: any) => {
      this.news.push(data);
      this.filterNews(); // Filtrar noticias después de agregar una nueva
      this.newTitle = '';
      this.newBody = '';
      this.newCategory = [];
      this.showForm = false;
      this.registrarClick('click-submit-news'); // Asegúrate de que se llame este método
    });
  }

  editNews(newsItem: any) {
    this.editNewsItem = newsItem;
    this.newTitle = newsItem.title;
    this.newBody = newsItem.body;
    this.newCategory = newsItem.category;
    this.showEditForm = true;
    this.showForm = false;
  }

  updateNews() {
    const updatedNews = {
      _id: this.editNewsItem._id,
      title: this.newTitle,
      body: this.newBody,
      category: this.newCategory
    };
    this.newsService.updateNews(updatedNews).subscribe((data: any) => {
      const index = this.news.findIndex(newsItem => newsItem._id === data._id);
      if (index !== -1) {
        this.news[index] = data;
        this.filterNews(); // Filtrar noticias después de actualizar
      }
      this.closeForm();
    });
  }

  deleteNews(newsId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.newsService.deleteNews(newsId).subscribe(() => {
        this.news = this.news.filter(newsItem => newsItem._id !== newsId);
        this.filterNews(); // Filtrar noticias después de eliminar una
        this.registrarClick('click-delete-news'); // Asegúrate de que se llame este método
      });
    }
  }

  filterNews() {
    if (this.selectedCategories.length > 0 && this.selectedCategories[0] !== '') {
      this.filteredNews = this.news.filter(newsItem =>
        newsItem.category.some((cat: string) => this.selectedCategories.includes(cat))
      );
    } else {
      this.filteredNews = this.news;
    }
  }

  closeForm() {
    this.showForm = false;
    this.showEditForm = false;
    this.newTitle = '';
    this.newBody = '';
    this.newCategory = [];
  }

  registrarVisita(sitioEvento: string) {
    this.estadisticasService.registrarVisita(sitioEvento).subscribe(response => {
      console.log('Visita registrada:', response);
    });
  }

  registrarClick(sitioEvento: string) {
    this.estadisticasService.registrarClick(sitioEvento).subscribe(response => {
      console.log('Click registrado:', response);
    });
  }
}

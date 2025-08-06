import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**Ojo:
 * Tendras que limpiar bien la base de datos prque hay
 * varios registros con campos vacios que no deben de ser asi
 * por el momento le coloco que puede ser nulo tambien
 * pero esto puede cambiar en el futuro y ya no aceptar datos 
 * vacios
 */

export interface Product {
  gameId: number;
  name: string | null;
  date: string | null;
  description: string | null;
  urlImg: string;
  price: number;
  genres: string[] | null; // Tambien puede no tener generos NULL
  requirements: {
    requirementId: number;
    osId: number;
    os: string;
    requirementTypeId: number;
    processor: string | null;
    memory: string | null;
    graphics: string | null;
  }[];
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}

  getGameById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

}

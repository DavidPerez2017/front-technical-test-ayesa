export class Utils {
  public static filterArrayByString(mainArr: any, searchText: any): any {
    if (searchText === '') {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj: any) => {
      return this.searchInObj(itemObj, searchText);
    });
  }

  public static orderTimeAsc(array: any[], key: string): any {
    return array.sort((a, b) => {
      const ad = new Date(a[key]);
      const bd = new Date(b[key]);
      if (ad > bd) {
        return 1;
      }
      if (ad < bd) {
        return -1;
      }
      return 0;
    });
  }

  public static orderTimeDesc(array: any[], key: string): any {
    return array.sort((a, b) => {
      const ad = new Date(a[key]);
      const bd = new Date(b[key]);
      if (ad < bd) {
        return 1;
      }
      if (ad > bd) {
        return -1;
      }
      return 0;
    });
  }

  public static searchInObj(itemObj: any, searchText: any): boolean {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (typeof value === 'number') {
        if (this.searchInString('' + value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }

    return false;
  }

  public static removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  public static filterList(event: any, allRows: any[], rows: any[]): any {
    let val = event.target.value.toLowerCase();
    val = Utils.removeAccents(val);
    rows = allRows;
    // tslint:disable-next-line: typedef
    const filters = rows.filter(function (objeto) {
      // tslint:disable-next-line: forin
      for (const i in objeto) {
        let valorObjeto = String(objeto[i]);
        valorObjeto = Utils.removeAccents(valorObjeto);
        const existe = valorObjeto.toLowerCase().indexOf(val) !== -1 || !val;
        if (existe) {
          return objeto;
        }
      }
    });
    return filters;
  }

  public static searchInArray(arr: any, searchText: any): boolean {
    for (const value of arr) {
      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }

    return false;
  }

  public static searchValueInArrayByKey(
    arr: any,
    searchText: any,
    key: any
  ): boolean {
    for (const item of arr) {
      if (this.searchInString(item, searchText)) {
        return true;
      }
    }
    return false;
  }

  public static searchInString(value: string, searchText: any): any {
    const valueClear = Utils.removeAccents(value).toLowerCase();
    const searchClear = Utils.removeAccents(searchText).toLowerCase();

    return valueClear.includes(searchClear);
  }

  public static generateGUID(): string {
    function S4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  public static toggleInArray(item: any, array: any[]): void {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  public static handleize(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  public static formatCurrency(n: number, currency: any) {
    return (
      currency +
      n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
      })
    );
  }

  // public static order(array, key): any {
  //     array.sort(function (a, b) {
  //         if (a[key] === 'No') {
  //             return 1;
  //         }
  //         else {
  //             return -1;
  //         }
  //     });
  //     return array;
  // }

  /**
   * Filtra un array de objetos dejando los que contengan el texto de la variable textSearch
   * en la propiedad de la variable property.
   *
   * @param objArray
   * @param property
   * @param textSearch
   * @returns El array filtrado
   */
  public static filterByProperty(
    objArray: any,
    property: string,
    textSearch: string
  ): any {
    const filteredList = [];

    for (const key in objArray) {
      if (Utils.searchInString(objArray[key][property], textSearch)) {
        filteredList.push(objArray[key]);
      }
    }

    return filteredList;
  }

  /**
   * Ordena un array de objetos por propiedad que sea de tipo string
   *
   * @param objArray
   * @param property
   * @param order "asc" para ordena de forma ascendente y "desc" para ordenar en forma descendente
   * @returns El array ordenado
   */
  public static sortByProperty(objArray: any, property: string, order: string) {
    objArray.sort((a: any, b: any) => {
      let fa =
        order === 'asc' ? a[property].toLowerCase() : b[property].toLowerCase();
      let fb =
        order === 'asc' ? b[property].toLowerCase() : a[property].toLowerCase();

      return fa < fb ? -1 : fa > fb ? 1 : 0;
    });
  }

  public static scroll(event: any, eleme: string, noAnimate?: boolean): void {
    event?.stopPropagation();
    const element = document.querySelector('#' + eleme);
    if (element) {
      if (noAnimate) {
        element.scrollIntoView({
          block: 'start',
          inline: 'nearest',
        });
      } else {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  }
}

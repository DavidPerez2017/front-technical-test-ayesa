import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'minutes' })

export class MinutesPipe implements PipeTransform {
    constructor() { }
    // tslint:disable-next-line: typedef

    // format default = 'hrs:min'
    transform(hours: number, format?: string) {
        const h = hours * 60;
        const m = h % 60;


        // Example = 2hrs: 30min
        let newHours = Math.floor(hours) > 0 ? Math.floor(hours) + 'hrs: ' + m + 'min' : m + 'min';

        // Example = 2:30min
        if (format === ':min') {
            newHours = Math.floor(hours) > 0 ? Math.floor(hours) + ': ' + m + 'min' : m + 'min';

            // Example = 2:30
        } else if (format === ':') {
            newHours = Math.floor(hours) > 0 ? Math.floor(hours) + ':' + m : m + '';

            // Example = 2:30
        } else if (format === 'min') {
            newHours = (Math.floor(hours) * 60) + m + '';
        }

        else if (format === 'hrs') {
            newHours = Math.floor(hours) +  'hrs';
        }


        return newHours;
    }
}

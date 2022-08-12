import { addDays, format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

class DateHelper {
  public format(date: string | Date, pattern = 'yyyy-MM-dd'): string {
    if (typeof date === 'string') {
      return format(parseISO(date), pattern, { locale });
    }

    return format(date, pattern, { locale });
  }

  public parse(date: string | Date): Date {
    if (typeof date === 'string') return parseISO(date);

    return date;
  }

  public randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  public randomDatesFormatted(): [string, string] {
    const start = this.randomDate(new Date(2022, 0, 0), new Date(2023, 0, 0));
    const end = addDays(start, 10);

    const pattern = 'dd MMM yyyy';

    return [this.format(start, pattern), this.format(end, pattern)];
  }
}

const INSTANCE = new DateHelper();

export { INSTANCE as DateHelper };

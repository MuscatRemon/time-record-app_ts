export class Record {
  id: number;
  title: string;
  time: number;
  created_at: Date;

  constructor(id: number, title: string, time: number, created_at: Date) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.created_at = created_at;
  }
}

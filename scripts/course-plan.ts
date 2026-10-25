export class CoursePlan {
  public week: number;
  public topic: string;
  public description: string;

  constructor(week: number, topic: string, description: string) {
    this.week = week
    this.topic = topic;
    this.description = description;
  }

  getWeekLabel(): string | number{
    if(this.week < 10 )
    {
      return `0${this.week}`; 
    }
    if(this.week == 17) {
      return `${this.week}+`
    }
    return this.week;
  }
}

export function fromWeek(weekNumber: number, list: CoursePlan[]) {
  return list.filter(s => s.week >= weekNumber);
}

export function toWeek(weekNumber: number, list: CoursePlan[]) {
  return list.filter(s => s.week <= weekNumber);
}


export const coursePlanList = [ 
  new CoursePlan(5, 'Intro/FUTURUM', 'Dele af modul 1'),
  new CoursePlan(6, 'FUTURUM', 'Dele af modul 2'),
  new CoursePlan(7, 'Vinterferie', 'Drik ikke for mange øl'),
  new CoursePlan(8, 'Agile processer SCRUM', 'Populær indenfor softwareudvikling'),
  new CoursePlan(9, 'Special uge', ''),
  new CoursePlan(10, 'Agile processer KANBAN', 'Populær indenfor softwareudvikling'),
  new CoursePlan(11, 'PRINCE2', 'Brugt indenfor Cybersikkerhed'),
  new CoursePlan(12, 'PRINCE2', 'Brugt indenfor Cybersikkerhed'),
  new CoursePlan(13, 'PRINCE2', 'Brugt indenfor Cybersikkerhed'),
  new CoursePlan(14, 'Påskeferie', 'God jagt...'),
  new CoursePlan(15, 'Forandringsledelse', 'Mads')
];

export const coursePlanHeaders = ['Uge', 'Emne', 'Beskrivelse'];

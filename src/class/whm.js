export default class whm {
  month = "";
  airport = "";
  airplane = "";
  destination = "";

  constructor(month, airport, airplane, destination) 
  {
    this.month = month;
    this.airport = airport;
    this.airplane = airplane;
    this.destination = destination;
  }
  
  getTemplate()
  {
    return `
      <!DOCTYPE html>
      <html lang="ja">
        <p>Month = ${this.month}</p>
        <p>Airport = ${this.airport}</p>
        <p>Plane = ${this.airplane}</p
        <p>Destination = ${this.destination.replace(/"/g,"")}</p>
      </html>
    `;
  }
}
import { Application, Container, Text } from 'pixi.js';
import { BaseEntityConstructor } from '../../shared/interfaces';

export class Dashboard {
  private app: Application;
  private _container: Container;
  private tribeMembersText: Text;
  private resourcesText: Text;

  public get container(): Container {
    return this._container;
  }

  constructor({ app }: BaseEntityConstructor) {
    this.app = app;
    this._container = new Container();
    this.tribeMembersText = new Text('Tribe Members: 0', { fill: 'white' });
    this.tribeMembersText.position.set(10, 10);
    this.resourcesText = new Text('Resources: 0', { fill: 'white' });
    this.resourcesText.position.set(10, 40);
    this._container.addChild(this.resourcesText);
    this._container.addChild(this.tribeMembersText);
  }

  public updateDashboard(tribeMembers: number, resources: number) {
    this.tribeMembersText.text = `Tribe Members: ${tribeMembers}`;
    this.resourcesText.text = `Resources: ${resources}`;
  }
}

import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
  providedIn: "root",
})
export class MessageFenix {
  listIdsMessages: string[] = [];

  constructor(private message: NzMessageService) {}

  /**
   * David Pérez
   * @param text of message
   * @returns id of message
   */
  openMessageToastLoading(text: string, noCloseAllMessages?: boolean): string {
    const id = this.message.loading(text + "...", { nzDuration: 0 }).messageId;
    if (!noCloseAllMessages) {
      this.closeAllMessages();
    }
    this.listIdsMessages.push(id);
    return id;
  }

  /**
   * David Pérez
   * @param type message
   * @param text of message
   * @returns id of message
   */
  openMessageToastType(
    type: "success" | "error" | "warning",
    text: string,
    duration?: number | null,
    noCloseAllMessages?: boolean
  ): string {
    const id = this.message.create(type, `${text}`, {
      nzDuration: duration ? duration : 3000,
    }).messageId;
    if (!noCloseAllMessages) {
      this.closeAllMessages();
    }
    this.listIdsMessages.push(id);
    return id;
  }

  /**
   * David Pérez
   * Close all messages por id
   */
  closeAllMessages(): void {
    for (const key in this.listIdsMessages) {
      const id = this.listIdsMessages[key];
      this.closeMessage(id);
    }
    this.listIdsMessages = [];
  }

  /**
   * David Pérez
   * Delete message by id
   * @param id
   */
  closeMessage(id: string): void {
    this.message.remove(id);
  }
}

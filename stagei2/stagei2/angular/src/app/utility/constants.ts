export interface Message{
     id: number;
    
      content:string,

    isUser: boolean;
    conversationId:number;
    createdAt: string;
 
}
export interface Conversation{
  [x: string]: any;
  id :number;
  messages: Message [],
   
   title:string,
   
   
   
}
export interface resetPassword{
  email:string;
  token:string;
  newpassword:string;
}
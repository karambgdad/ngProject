import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

//Why is our authentication status ignored when we try to fetch data? Well, because just because we know that we are authenticated and that we have the token somewhere in our user object, Firebase doesn't know that.We're not attaching it to that outgoing request and therefore Firebase has no chance of understanding that we have a valid token. We need to add that token to the outgoing request to let Firebase know about that. And for that, we need to manipulate our outgoing HTTP requests that are related to data storing and fetching.Hence, we need to look into the data storage service where we have fetch recipes and store recipes. And these requests here now need to be edited such that we do attach our token to them, the token we are storing in the user object in the auth service. For that, let's inject that auth service here.

@Injectable({'providedIn': 'root'})
export class DataStorageService  {
 
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService){}

  
// And now we need to get access to the user in both store recipes and fetch recipes because we need to get the token there.
//Now we could set up a subscription to the user, "because we have a user of type subject, whenever we do login and sign up successfully, we emit the user data "createdUser" (handleAuthentication) by a user subject" but I don't care about every change to the user. Instead, when we try to store or fetch recipes, I just want to get the token of the currently authenticated user. I don't want to have an ongoing subscription.



//Hence in the auth service we now should also store the token or the user in a way that we can access it through different means. So not through a subject which is great for reactively updating the user interface but that we also have a way of on demand fetching of the user data. Now there are a couple of different ways of achieving that. Since we're only interested in the token, we could just store the token here in a variable which is null initially and which will hold a string eventually: (token:string=null) where we set the token whenever we also emit a new subject (in handleAuthentication). That would be possible and wouldn't be wrong, but we can actually also use a different type of subject here. This subject is a subject to which we can subscribe and will get an information whenever new data is emitted. Now actually there is a different type of subject RXJS offers, which is called behavior subject. Now this is also imported from RXJS and generally it behaves just like the other subject, which means we can call next to emit a value and we can subscribe to it to be informed about new values. The difference is: that behavior subject also gives subscribers immediate access to the previously emitted value, even if they haven't subscribed at the point of time that value was emitted. That means we can get access to the currently active user even if we only subscribe after that user has been emitted. So this means when we fetch data and we need that token at this point of time, even if the user logged in before that point of time, which will have been the case, we get acces to that latest user, therefore behaviorSubject also need to be initialized with a starting value, which in my case will be null here. It has to be a user object and null is a valid replacement because I don't wanna start off with a user

//so there is no need for a subject to keep emitting user data, rather, whe we subscribe to this behaviorSubject we get the logged in user data/token

//Now we don't need to change anything in the auth service. We still emit our user as we do before, when signUp or signIn,But in our data storage service, now we can reach out to the auth service user "the behaviorSubject", get the currently active user and be done with that.And that's just what I wanna do here, for example, when we fetch recipes.

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();


       this.http.put<Recipe[]>('https://recipe-book-d60a6-default-rtdb.firebaseio.com/recipes.json',recipes)
       .subscribe((response)=>{
            console.log(response)
       })
      

    }


    fetchRecipes(){
       //So here we reach out to the auth service, there to the user. And now the thing just is I don't wanna set up an ongoing subscription and still I need to subscribe to get that user. So to make sure I only get the user onceand thereafter I'm done, of course we could manually immediately call unsubscribe thereafter, or you use pipe and then a special operator RXJS gives you and that would be the take operator. Take is also imported from RXJS operator and take is called as a function and you simply pass a number to it. And I pass one here. And what this tells RXJS is that I only wanna take one value from that observable and thereafter it should automatically unsubscribe.So this manages the subscription for me,gives me the latest user and unsubscribes.and I'm not getting future users because I just want to get them on demand when fetch recipes is called.

      return this.authService.user.pipe(take(1), exhaustMap( user =>{

          return this.http.get<Recipe[]>('https://recipe-book-d60a6-default-rtdb.firebaseio.com/recipes.json',
          { 
           params: new HttpParams().set('auth', user.token)
          }
        )
       })
       //.subscribe(user =>{
                //In here we can then use this HTTP request observable and set it up in here and attach our token, which we get out of the user. The problem just is here we're in subscribe of an observable and there "below: this.http.get<Recipe[]>" we create yet a number observable. And in the end I want to return that observable: " return this.http.get<Recipe[]>" here but returning from inside subscribe: "this subscribe here" does not work.We have to return on the top level of this method.
      // })

       //The solution is that we pipe these two observables, the user observable and the HTTP observable together into one big observable.You simply add another operator here to pipe : "this.authService.user.pipe(take(1), here)" for the user observable. And there we can use exhaustMap, exhaustMap It waits for the first observable, for the user observable, to complete which will happen after we took the latest user. Thereafter, it gives us that user. So in exhaust map, we pass in a function. There we get the data from that previous observable: "exhaustMap( user =>{*})" and now we return a new observable in there * which will then replace our previous observable in that entire observable chain. So we start off with a user observable,and once we're done with that, this will be replaced in that observable chain with the inner observable we return inside of that functionwe passed to exhaust map. So in there, I will return this HTDP request where I get my recipes. This is now returned inside of exhaust map and therefore this entire observable chain now switches to this HTTP observable.



        //I don't wanna set up an ongoing subscription which gives me users at a point of time I don't need them anymore.

        
        //.pipe( //we already have a pipe operator above therefore we just add these both methode to our pipe operator above
            
            
           ,map((recipes)=>{
            return recipes.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
            })

        }),

        tap((recipes)=>{
            this.recipeService.setRecipes(recipes)
        })
        
        //)
        
//and to the outside world, nothing will change. But inside we utilized this user observable, got the user out of it one time only, unsubscribed to that observable and then automatically replaced it with a new observable here. Now of course, this alone doesn't do everything. We got the user now. Now we can extract the token.
        )

    }


}

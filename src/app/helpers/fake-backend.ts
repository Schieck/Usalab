import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // array in local storage for registered essays
        let essays: any[] = JSON.parse(localStorage.getItem('essays')) || [];

        // array in local storage for registered visits
        let visits: any[] = JSON.parse(localStorage.getItem('visits')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Usuário ou senha incorreto.' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Usuário "' + newUser.username + '" já existe.' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            //get essays
            if (request.url.endsWith('/essays') && request.method === 'GET') {
                // check for fake auth token in header and return essays if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: essays }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            //get visits
            if (request.url.endsWith('/visits') && request.method === 'GET') {
                // check for fake auth token in header and return visits if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: visits }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            //set visits
            if (request.url.endsWith('/visits/') && request.method === 'PUT') {
                // check for fake auth token in header and return visits if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    visits = request.body;
                    localStorage['visits'] = visits;

                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            //get by type
            if (request.url.match(/\/essays\/[a-z]+$/) && request.method === 'GET') {
                // check for fake auth token in header and return essay if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find essay by type in essays array
                    let urlParts = request.url.split('/');
                    let type = urlParts[urlParts.length - 1];
                    let matchedessays = essays.filter(essay => { return essay.type === type; });

                    return of(new HttpResponse({ status: 200, body: matchedessays }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get essay by id
            if (request.url.match(/\/essays\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return essay if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find essay by id in essays array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedessays = essays.filter(essay => { return essay.id === id; });
                    let essay = matchedessays.length ? matchedessays[0] : null;

                    return of(new HttpResponse({ status: 200, body: essay }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // update essay by id
            if (request.url.match(/\/essays\/\d+$/) && request.method === 'PUT') {
                // check for fake auth token in header and return essay if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find essay by id in essays array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // get new essay object from post body
                    let newessay = request.body;

                    let sameInterval = essays.filter(essay => {
                        let newdate = new Date(newessay.fromDate).setHours(0,0,0,0);
                        let olderdate = new Date(essay.fromDate).setHours(0,0,0,0);

                        let samedate = (newdate === olderdate); 
                        let insidehour =  (this.convertTime(newessay.fromTime) > this.convertTime(essay.fromTime) && this.convertTime(essay.toTime) > this.convertTime(newessay.fromTime));

                        return samedate && insidehour;
                    }).length;

                    if (sameInterval) {
                        return throwError({ error: { message: 'Já existe uma simulação para este horário.' } });
                    }

                    var elementPos = essays.map(function (x) { return x.id; }).indexOf(id);
                    essays[elementPos] = newessay;

                    localStorage.setItem('essays', JSON.stringify(essays));

                    return of(new HttpResponse({ status: 200, body: newessay }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register essay
            if (request.url.endsWith('/essays/register') && request.method === 'POST') {

                // check for fake auth token in header and return essay if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // get new essay object from post body
                    let newessay = request.body;

                    // validation
                    let duplicateessay = essays.filter(essay => { return essay.title === newessay.title; }).length;

                    let sameInterval = essays.filter(essay => {
                        let newdate = new Date(newessay.fromDate).setHours(0,0,0,0);
                        let olderdate = new Date(essay.fromDate).setHours(0,0,0,0);

                        let samedate = (newdate === olderdate); 
                        let insidehour =  (this.convertTime(newessay.fromTime) > this.convertTime(essay.fromTime) && this.convertTime(essay.toTime) > this.convertTime(newessay.fromTime));

                        return samedate && insidehour;
                    }).length;

                    if (duplicateessay) {
                        return throwError({ error: { message: 'Simulação "' + newessay.title + '" já existe.' } });
                    }

                    if (sameInterval) {
                        return throwError({ error: { message: 'Já existe uma simulação para este horário.' } });
                    }

                    // save new essay
                    newessay.id = essays.length + 1;
                    essays.push(newessay);
                    localStorage.setItem('essays', JSON.stringify(essays));

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // delete essay
            if (request.url.match(/\/essays\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return essay if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find essay by id in essays array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < essays.length; i++) {
                        let essay = essays[i];
                        if (essay.id === id) {
                            // delete essay
                            essays.splice(i, 1);
                            localStorage.setItem('essays', JSON.stringify(essays));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    convertTime(time) {
        var time = time.split(':');
        return (time[0] * 60 + time[1]);
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
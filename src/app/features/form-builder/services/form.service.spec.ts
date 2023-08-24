import { HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { FormService } from 'src/app/features/form-builder/services/form.service';
import { Field } from './../store/interfaces';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'


describe('FormService', () => {
  let httpTestingController: HttpTestingController
  let formService: FormService
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormService],
    })

    formService = TestBed.get(FormService)
    httpTestingController = TestBed.get(
      HttpTestingController
    )
  })

  it('should make request to get fields', () => {
    const expectedFields: Field[] =
      [{
        "id": 1,
        "type": "input",
        "styles": [
          "label"
        ]
      }];
    formService
      .getFields()
      .subscribe((response) => expect(response).toBe(expectedFields))
    const req = httpTestingController.expectOne(`${environment.server}fields`)
    expect(req.request.method).toBe('GET')
    req.flush(expectedFields)
  })

  it('should make request to get border types', () => {
    const expectedFields: string[] = ['first', 'second']
    formService
      .getBorderTypes()
      .subscribe((response) => expect(response).toBe(expectedFields))
    const req = httpTestingController.expectOne(`${environment.server}borderTypes`)
    expect(req.request.method).toBe('GET')
    req.flush(expectedFields)
  })

  it('should make request to post savedForm', () => {
    const post = {
      userLogin: 'login', formStyles: {
        label: '',
        textColor: '',
        backgroundColor: '',
        borderColor: '',
        borderType: ''
      }, formElements: {}
    }
    formService
      .saveForm(post)
      .subscribe((response) => post)
    const req = httpTestingController.expectOne(`${environment.server}savedForms`)
    expect(req.request.method).toBe('POST')
    req.flush(post)
  })

  it('should return error on get request to borderTypes', () => {
    const message = 'Session expired'
    formService.getBorderTypes().subscribe(
      (response) => fail('should fail with the 401 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401, 'status')
        expect(err.error).toBe(message, 'message')
      }
    )
    const req = httpTestingController.expectOne(`${environment.server}borderTypes`)
    expect(req.request.method).toBe('GET')
    req.flush(message, {
      status: 401,
      statusText: 'Unauthorized',
    })
  })

  it('should return error on get request to getFields', () => {
    const message = 'Session expired'
    formService.getFields().subscribe(
      (response) => fail('should fail with the 401 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401, 'status')
        expect(err.error).toBe(message, 'message')
      }
    )
    const req = httpTestingController.expectOne(`${environment.server}fields`)
    expect(req.request.method).toBe('GET')
    req.flush(message, {
      status: 401,
      statusText: 'Unauthorized',
    })
  })

  it('should return error on post request to savedForms', () => {
    const post = {
      userLogin: 'login', formStyles: {
        label: '',
        textColor: '',
        backgroundColor: '',
        borderColor: '',
        borderType: ''
      }, formElements: {}
    }
    const message = 'Session expired'
    formService.saveForm(post).subscribe(
      (response) => fail('should fail with the 401 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401, 'status')
        expect(err.error).toBe(message, 'message')
      }
    )
    const req = httpTestingController.expectOne(`${environment.server}savedForms`)
    expect(req.request.method).toBe('POST')
    req.flush(message, {
      status: 401,
      statusText: 'Unauthorized',
    })
  })
  afterEach(() => httpTestingController.verify())
})

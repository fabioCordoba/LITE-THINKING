from io import BytesIO # nos ayuda a convertir un html en pdf
from django.http import HttpResponse
from rest_framework import status
from django.template.loader import get_template
from django.core.mail import EmailMessage

from requests import Response
from xhtml2pdf import pisa

from companies.models import Companie
from products.models import Product

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    if not pdf.err:
        return result.getvalue()
    return None

def render_to_pdf_2(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None

def get_products(nit=None):
    if nit:
        company = Companie.objects.get(nit=nit)
        products = company.products.all()
        data = {
            'company': company,
            'products': products,
            'multiple': False,
        }
    else:
        products = Product.objects.all()
        data = {
            'products': products,
            'multiple': True,
        }

    return data

def send_pdf_email(pdf_content, to_email, filename='products_report.pdf'):
    mail = EmailMessage(
        subject='Product Report',
        body='Attached is the requested product report.',
        to=[to_email]
    )
    mail.attach(filename, pdf_content, 'application/pdf')
    mail.send()
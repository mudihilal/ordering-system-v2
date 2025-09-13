from django.contrib import admin
from .models import Product, Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id","user","name","total","status","created_at"]
    inlines = [OrderItemInline]

admin.site.register(Product)

from django.contrib import admin
from .models import User, Order, OrderItem

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'full_name', 'is_staff', 'is_superuser']
    search_fields = ['email', 'full_name']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'completed', 'created_at']  
    list_filter = ['completed', 'created_at']           
    search_fields = ['user__email']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity']
    search_fields = ['order__user__email', 'product__name']
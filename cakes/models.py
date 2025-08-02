from django.db import models

class Cake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    weight = models.DecimalField(max_digits=5, decimal_places=2, help_text="weight in pounds")
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='cakes/') #this requires media config

    def __str__(self):
        return self.name
    
class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=20)
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)
    message = models.TextField(blank=True)
    delivery_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.customer_name} for {self.cake.name}"

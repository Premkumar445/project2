#!/usr/bin/env python
import os
import sys
import django
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'harvestbites.settings')
django.setup()

print("Running migrations...")
call_command('migrate')
print("Migrations completed!")

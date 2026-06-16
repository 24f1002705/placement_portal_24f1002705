def eligibility_check_drives(drives, userdata):
    for drive in drives:
        drive['eligibility'] = eligibility_check(drive, userdata)

    return drives

def sort_applications(applications):
    return applications

def eligibility_check(drive, userdata):
    return True

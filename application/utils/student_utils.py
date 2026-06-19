def eligibility_check_drives(drives, userdata):
    for drive in drives:
        drive['eligibility'] = eligibility_check(drive, userdata)

    return drives

def sort_applications(applications):
    return applications

def eligibility_check(drive, userdata):

    student = userdata[0]

    eligible_branches = [
        branch.strip()
        for branch in drive['eligibility_branches'].split(',')
    ]

    eligible_degrees = [
        degree.strip()
        for degree in drive['eligibility_degree'].split(',')
    ]

    eligible_batch = int(drive['eligibility_batch'])

    student_branch = student['department']
    student_degree = student['degree']
    student_batch = int(student['graduation_batch'])

    print(student_branch in eligible_branches)
    print(student_batch == eligible_batch)
    print(student_degree, eligible_degrees, student_degree in eligible_degrees)

    if student_branch not in eligible_branches:
        return False

    if student_degree not in eligible_degrees:
        return False

    if student_batch != eligible_batch:
        return False

    return True

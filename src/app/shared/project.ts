export interface Project {
    $key: string;
    projectName: string;
    projectSummery: string;
    createDate: string
    lastUpdateDate: string;
    ownerEmail: string;
    permissions: string[]; //emails of people with permissions to see the project
    emailOfSomeoneToInvite: string;
 }
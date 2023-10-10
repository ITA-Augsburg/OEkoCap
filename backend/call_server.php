<?php

header('Content-Type: application/json');
// header("Access-Control-Allow-Origin: 12.34.56.78:80");
$request_payload = file_get_contents('php://input');
$json_array = json_decode($request_payload, true);  # json as array
$json_pretty = json_encode($json_array, JSON_PRETTY_PRINT);

# arriving user input is saved in a folder-structure in the following directory
$input_base_directory = "C:\\1_My_stuff\\XAMPP\\htdocs\\meine_dateien\\ita_webapp_back\\input_files\\";
$output_base_directory = "C:\\1_My_stuff\\XAMPP\\htdocs\\meine_dateien\\ita_webapp_back\\output_files\\";
$current_date = getdate()["year"] . "_" . getdate()["mon"] . "_" . getdate()["mday"];
$current_time = getdate()["hours"] . "_" . getdate()["minutes"] . "_" . getdate()["seconds"];
// $random = rand(1, 999);
$input_file_name = $current_date . "-" . $current_time . "_input.json";
$input_file_path = $input_base_directory . $current_date . "\\" . $input_file_name;

# if this is the first submission of the day, create input-sub-folder and output-sub-folder, save new file into input-sub-folder as date-time_input.json
if(!is_dir($input_base_directory . $current_date)) {
    mkdir($input_base_directory . $current_date);
}
if(!is_dir($output_base_directory . $current_date)) {
    mkdir($output_base_directory . $current_date);
}

# if multiple inputs arrive at the server in the same second, their execution will be delayed for 1 second
while(file_exists($input_file_path)) {
    sleep(1);
    $current_date = getdate()["year"] . "_" . getdate()["mon"] . "_" . getdate()["mday"];
    $current_time = getdate()["hours"] . "_" . getdate()["minutes"] . "_" . getdate()["seconds"];
    $input_file_name = $current_date . "-" . $current_time . "_input.json";
    $input_file_path = $input_base_directory . $current_date . "\\" . $input_file_name;
}

$file = fopen($input_file_path, "w");
if($file == false) {
    echo ( "Error in opening new file" );
    exit();
}
fwrite($file, $json_pretty);
fclose($file);

# for whatever reason two files are created, one with the inputs and one with null
# delete null-file
if(filesize($input_file_path) == 4) {
    unlink($input_file_path);
    return;
}

// $file = fopen($input_file_path, "r");
// if($file == false) {
//     echo ( "Error in opening new file" );
//     exit();
// }
// echo fread($file, 500);
// fclose($file);

# run application, create output file
$output_file_name = $current_date . "-" . $current_time . "_output.json";
$output_file_path = $output_base_directory . $current_date . "\\" . $output_file_name;
$exec_string = 'C:\\1_My_stuff\\1StudiumAugsburg\\OekoCaP\\oekocap_angaben\\recycling_v4_2\\recycling.exe --inputFile="' . $input_file_path . '" --outputFile="' . $output_file_path . '"';
exec($exec_string);

# return filename
// echo $current_date . ">" . $output_file_name;
# return output as json
// echo $output_array = json_decode(file_get_contents($output_file_path), true);
// $output_pretty = json_encode($output_array, JSON_PRETTY_PRINT);
// echo $output_pretty;
echo file_get_contents($output_file_path);
?>
